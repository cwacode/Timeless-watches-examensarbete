<template>
  <v-container fluid fill-height style="min-height: 90vh;">
    <!-- Create/Edit Order Dialog -->
    <v-dialog v-model="editDialog" persistent max-width="1000px">
      <v-card>
        <v-card-title>
          <span>{{ editedIndex === -1 ? 'New Order' : 'Edit Order' }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.firstName" label="First Name"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.lastName" label="Last Name"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.phone" label="Phone"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.address" label="Address"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.postalCode" label="Postal Code"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.city" label="City"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.total" label="Total (€)" type="number" suffix="€"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editedItem.order_number" label="Order Number" type="number"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select v-model="editedItem.status" :items="['Pending', 'Shipped', 'Delivered', 'Cancelled']"
                  label="Status"></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select v-model="editedItem.shipping_method" :items="['Standard', 'Express']"
                  label="Shipping Method"></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select v-model="editedItem.payment_method" :items="['Credit Card', 'Invoice']"
                  label="Payment Method"></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title>Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Main Data Table -->
    <v-row justify="center">
      <v-col>
        <v-card class="mt-8">
          <v-card-title>
            <v-row class="fill-height" align="center" justify="space-between">
              <v-col class="text-center">
                <span>Orders</span>
              </v-col>
              <v-btn color="#214761" density="comfortable" @click="openNewOrderDialog">New Order</v-btn>
            </v-row>
          </v-card-title>
          <v-data-table :headers="headers" :items="orders" item-key="id" :items-per-page="10" class="elevation-1"
            density="compact">
            <template v-slot:item.total="{ item }">
              {{ item.total }}
            </template>

            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { defineComponent } from 'vue';
import { useOrderStore } from '@/stores/orderStore';
import { mapState, mapActions } from 'pinia';

export default defineComponent({
  name: 'OrdersPage',
  data() {
    return {
      dialogDelete: false,
      editDialog: false,
      editedIndex: -1,
      editedItem: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        city: '',
        total: 0,
        status: '',
        shipping_method: '',
        payment_method: '',
        items: []
      },
      headers: [
        { title: 'Actions', key: 'actions', sortable: false },
        { title: 'Id', key: 'id' },
        { title: 'Order Number', key: 'order_number' },
        {
          title: 'Contact',
          align: 'center',
          children: [
            { title: 'First Name', key: 'firstName' },
            { title: 'Last Name', key: 'lastName' },
            { title: 'Email', key: 'email' },
            { title: 'Phone', key: 'phone' },
          ],
        },
        {
          title: 'Address',
          align: 'center',
          children: [
            { title: 'Address', key: 'address' },
            { title: 'Postal Code', key: 'postalCode' },
            { title: 'City', key: 'city' },
          ],
        },
        {
          title: 'Order',
          align: 'center',
          children: [
            { title: 'Total (€)', key: 'total' },
            { title: 'Status', key: 'status' },
            { title: 'Shipping Method', key: 'shipping_method' },
            { title: 'Payment Method', key: 'payment_method' },
            { title: 'Ordered Items', key: 'items' }
          ],
        },
      ]
    };
  },
  computed: {
    ...mapState(useOrderStore, {
      orders: state => state.orders.map(order => ({
        id: order.id,
        order_number: order.order_number,
        firstName: order.customer_details.firstName,
        lastName: order.customer_details.lastName,
        email: order.customer_details.email,
        phone: order.customer_details.phone,
        address: order.customer_details.address,
        postalCode: order.customer_details.postalCode,
        city: order.customer_details.city,
        total: parseFloat(order.total),
        status: order.status,
        shipping_method: order.shipping_method,
        payment_method: order.payment_method,
        items: order.items,
      }))
    })
  },
  created() {
    this.fetchOrdersIfNeeded();
  },
  methods: {
    ...mapActions(useOrderStore, ['fetchOrders', 'createOrder', 'deleteOrder', 'updateOrder']),
    fetchOrdersIfNeeded() {
      if (!this.orders.length) {
        this.fetchOrders();
      }
    },
    openNewOrderDialog() {
      this.editedItem = { firstName: '', lastName: '', email: '', phone: '', address: '', postalCode: '', city: '', total: 0, status: '', shipping_method: '', payment_method: '' };
      this.editedIndex = -1;
      this.editDialog = true;
    },
    editItem(item) {
      this.editedIndex = this.orders.indexOf(item);
      this.editedItem = { ...item }; // Ensure all properties are copied, including the ID
      this.editDialog = true;
    },

    deleteItem(item) {
      if (!item || !item.id) {
        console.error('Invalid item or missing ID:', item);
        return; // Stop execution if the item is invalid or the ID is missing
      }
      console.log("Item selected for deletion:", item.id);  // Log the ID being used for deletion
      this.editedIndex = this.orders.indexOf(item);
      this.editedItem = Object.assign({}, item); // Ensure item is copied over, including its ID
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      if (this.editedItem && this.editedItem.id) {
        await this.deleteOrder(this.editedItem.id);
        this.dialogDelete = false;
        this.editedItem = {}; // Reset editedItem after operation
      } else {
        console.error('Attempted to delete an order without an ID:', this.editedItem);
        // Optionally alert the user that the deletion cannot proceed due to missing ID
      }
    },

    buildOrderPayload(orderData) {
      return {
        order_number: orderData.order_number,
        status: orderData.status,
        shipping_method: orderData.shipping_method,
        payment_method: orderData.payment_method,
        total: String(orderData.total),
        customer_details: JSON.stringify({
          firstName: orderData.firstName,
          lastName: orderData.lastName,
          email: orderData.email,
          phone: orderData.phone,
          address: orderData.address,
          postalCode: orderData.postalCode,
          city: orderData.city
        }),
        items: JSON.stringify(orderData.items)
      };
    },

    async save() {
      let orderDetails = this.buildOrderPayload(this.editedItem);

      console.log('Order details to save:', JSON.stringify(orderDetails, null, 2));

      try {
        if (this.editedItem.id) {
          await this.updateOrder(this.editedItem.id, orderDetails);
        } else {
          await this.createOrder(orderDetails);
        }
        this.close();
      } catch (error) {
        console.error('Failed to process order:', error);
      }
    },

    close() {
      this.editDialog = false;
      this.editedItem = {};
      this.editedIndex = -1;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
  },
},
);
</script>
