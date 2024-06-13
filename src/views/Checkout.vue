<template>
    <v-container class="pa-0" fluid style="min-height: 80vh;">
        <v-col cols="12" sm="10" md="9" lg="8" class="mt-5" style="max-width: 1200px;">
            <v-card flat class="pa-2" color="#FFFBFC">
                <v-expansion-panels v-model="panel" variant="accordion" class="ga-6 mt-4">
                    
                    <!-- Cart Review Panel -->
                    <v-expansion-panel v-model="cartPanel">
                        <v-expansion-panel-title class="text-h6">
                            <v-icon icon="mdi-cart-outline" class="mr-3"></v-icon>
                            Cart Review
                            <template v-slot:actions="{ disabled }">
                                <v-icon :color="!disabled ? 'teal' : ''" :icon="!disabled ? 'mdi-check' : ''"></v-icon>
                            </template>
                        </v-expansion-panel-title>
                        <v-divider></v-divider>
                        <v-expansion-panel-text class="mt-4">
                            <v-row justify="center">
                                <v-col cols="12" md="10" lg="9" class="cart-col pa-2">
                                    <cart :isDirectAccess="false" />
                                </v-col>
                            </v-row>
                            <v-col class="text-end">
                                <v-spacer></v-spacer>
                                <v-btn class="text-overline " color="#214761"
                                    @click="nextPanel(0), this.cartPanel = true">Next</v-btn>
                            </v-col>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <!-- Customer Information Panel -->
                    <v-expansion-panel v-model="customerPanel" :disabled="!this.cartPanel">
                        <v-expansion-panel-title class="text-h6">
                            <v-icon icon="mdi-account-outline" class="mr-3"></v-icon>
                            Customer Information

                            <template v-slot:actions="{ disabled }">
                                <v-icon :color="!disabled ? 'teal' : ''" :icon="!disabled ? 'mdi-check' : ''"></v-icon>
                            </template>
                        </v-expansion-panel-title>
                        <v-divider></v-divider>
                        <v-expansion-panel-text class="mt-4">
                            <v-row justify="center">
                                <v-col cols="12" sm="10" md="9" lg="8">
                                    <v-form ref="costumerForm" v-model="validCustomer">
                                        <v-col>
                                            <v-text-field variant="outlined" hide-details v-model="customer.firstName"
                                                label="First name" required density="comfortable"
                                                :rules="[rules.required]" autofocus></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field variant="outlined" hide-details v-model="customer.lastName"
                                                label="Last name" required density="comfortable"
                                                :rules="[rules.required]"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field variant="outlined" hide-details v-model="customer.email"
                                                label="Email" required density="comfortable" :rules="[rules.required]"
                                                type="email"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field variant="outlined" hide-details v-model="customer.phone"
                                                label="Phone number" required density="comfortable"
                                                :rules="[rules.required]"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field variant="outlined" hide-details v-model="customer.address"
                                                label="Address" required density="comfortable"
                                                :rules="[rules.required]"></v-text-field>
                                        </v-col>
                                        <v-col class="mb-5">
                                            <v-row>
                                                <v-col cols="12" sm="4">
                                                    <v-text-field variant="outlined" hide-details
                                                        v-model="customer.postalCode" label="Postal code" required
                                                        density="comfortable" :rules="[rules.required]"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="8">
                                                    <v-text-field variant="outlined" hide-details
                                                        v-model="customer.city" label="City" required
                                                        density="comfortable" :rules="[rules.required]"></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-divider></v-divider>
                                    </v-form>
                                    <v-col class="text-end">
                                        <v-spacer></v-spacer>
                                        <v-btn class="text-overline " color="#214761" :disabled="!validCustomer"
                                            @click="nextPanel(1), this.customerPanel = true">Next</v-btn>
                                    </v-col>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <!-- Shipping Method Panel -->
                    <v-expansion-panel v-model="shippingPanel" :disabled="!this.customerPanel">
                        <v-expansion-panel-title class="text-h6">
                            <v-icon icon="mdi-truck-outline" class="mr-3"></v-icon>
                            Shipping Method
                            <template v-slot:actions="{ disabled }">
                                <v-icon :color="!disabled ? 'teal' : ''" :icon="!disabled ? 'mdi-check' : ''"></v-icon>
                            </template>
                        </v-expansion-panel-title>
                        <v-divider></v-divider>
                        <v-expansion-panel-text class="mt-4">
                            <v-row justify="center">
                                <v-col cols="10" sm="10" md="9" lg="8">
                                    <v-radio-group class="my-4" v-model="shipping.method" :rules="[rules.required]"
                                        style="font-size: small;">
                                        <v-row justify="center">
                                            <v-col cols="12" class="px-2 pr-4 radio-col"
                                                :class="{ 'radio-background': shipping.method === 'Standard' }">
                                                <v-radio value="Standard">

                                                    <template v-slot:label>
                                                        <div id="shipping-text" class="text-start font-weight-bold"
                                                            style="width: 550px;">Home
                                                            delivery Standard: <span class="font-weight-regular">3-5
                                                                days</span></div>
                                                        <div id="shipping-text" class="text-end font-weight-bold"
                                                            style="width: 220px;">
                                                            Free
                                                        </div>
                                                    </template>
                                                </v-radio>
                                            </v-col>
                                            <v-col cols="12" class="px-2 pr-4 radio-col"
                                                :class="{ 'radio-background': shipping.method === 'Express' }">
                                                <v-radio value="Express">

                                                    <template v-slot:label>
                                                        <div id="shipping-text" class="text-start font-weight-bold"
                                                            style="width: 550px;">Home
                                                            delivery Express: <span class="font-weight-regular">1-2
                                                                days</span></div>
                                                        <div id="shipping-text" class="text-end font-weight-bold"
                                                            style="width: 220px;">
                                                            15 €
                                                        </div>
                                                    </template>
                                                </v-radio>
                                            </v-col>
                                        </v-row>
                                    </v-radio-group>
                                    <v-divider></v-divider>
                                    <v-col class="text-end px-0">
                                        <v-spacer></v-spacer>
                                        <v-btn class="text-overline" color="#214761" :disabled="!this.shipping.method"
                                            @click="nextPanel(2), this.shippingPanel = true">Next</v-btn>
                                    </v-col>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <!-- Payment Information Panel -->
                    <v-expansion-panel v-model="paymentPanel" :disabled="!this.shippingPanel">
                        <v-expansion-panel-title class="text-h6">
                            <v-icon icon="mdi-credit-card-outline" class="mr-3"></v-icon>
                            Payment Information

                            <template v-slot:actions="{ disabled }">
                                <v-icon :color="!disabled ? 'teal' : ''" :icon="!disabled ? 'mdi-check' : ''"></v-icon>
                            </template>
                        </v-expansion-panel-title>
                        <v-divider></v-divider>
                        <v-expansion-panel-text class="mt-4">
                            <v-row justify="center">
                                <v-col cols="12" sm="10" md="9" lg="8">
                                    <v-radio-group class="mb-4 color-black" hide-details inline v-model="payment.method"
                                        @change="syncInvoiceWithCustomer">
                                        <v-radio class="text-body-2" label="Card payment"
                                            value="Card Payment"></v-radio>
                                        <v-radio class="text-body-2" label="Invoice" value="Invoice"></v-radio>
                                    </v-radio-group>

                                    <!-- Card Payment Form -->
                                    <v-form ref="CardPaymentForm" v-model="validCardPayment"
                                        v-if="payment.method === 'Card Payment'">
                                        <!-- <v-col>
                                            <v-text-field variant="outlined" hide-details v-model="payment.card.name"
                                                label="Full Name" required density="comfortable"
                                                :rules="[rules.required]" autofocus></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field variant="outlined" hide-details v-model="payment.card.number"
                                                label="Card Number" required density="comfortable"
                                                :rules="[rules.required]"></v-text-field>
                                        </v-col>
                                        <v-col class="mb-5">
                                            <v-row>
                                                <v-col cols="7">
                                                    <v-text-field variant="outlined" hide-details
                                                        v-model="payment.card.expiry" label="Expiry Date" required
                                                        density="comfortable" :rules="[rules.required]"></v-text-field>
                                                </v-col>
                                                <v-col cols="5">
                                                    <v-text-field variant="outlined" hide-details
                                                        v-model="payment.card.cvv" label="CVV" required
                                                        density="comfortable" :rules="[rules.required]"></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-col> -->
                                        <v-divider></v-divider>
                                        <v-col class="text-end">
                                            <v-spacer></v-spacer>
                                            <v-btn class="text-overline" color="#214761" :disabled="!payment.method"
                                                @click="nextPanel(3), this.paymentPanel = true">Next</v-btn>
                                        </v-col>
                                    </v-form>

                                    <!-- Invoice Payment Form -->
                                    <v-form ref="InvoiceForm" v-model="validInvoice"
                                        v-if="payment.method === 'Invoice'">
                                        <v-col>
                                            <v-text-field variant="outlined" hide-details
                                                v-model="payment.invoice.firstName" label="First name" required
                                                density="comfortable" :rules="[rules.required]"
                                                autofocus></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field variant="outlined" hide-details
                                                v-model="payment.invoice.lastName" label="Last name" required
                                                density="comfortable" :rules="[rules.required]"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field variant="outlined" hide-details
                                                v-model="payment.invoice.email" label="Email" required
                                                density="comfortable" :rules="[rules.required]"
                                                type="email"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field variant="outlined" hide-details
                                                v-model="payment.invoice.phone" label="Phone number" required
                                                density="comfortable" :rules="[rules.required]"></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field variant="outlined" hide-details
                                                v-model="payment.invoice.address" label="Address" required
                                                density="comfortable" :rules="[rules.required]"></v-text-field>
                                        </v-col>
                                        <v-col class="mb-5">
                                            <v-row>
                                                <v-col cols="12" sm="4">
                                                    <v-text-field variant="outlined" hide-details
                                                        v-model="payment.invoice.postalCode" label="Postal code"
                                                        required density="comfortable"
                                                        :rules="[rules.required]"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="8">
                                                    <v-text-field variant="outlined" hide-details
                                                        v-model="payment.invoice.city" label="City" required
                                                        density="comfortable" :rules="[rules.required]"></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-divider></v-divider>
                                        <v-col class="text-end">
                                            <v-spacer></v-spacer>
                                            <v-btn class="text-overline" color="#214761" :disabled="!validInvoice"
                                                @click="nextPanel(3), this.paymentPanel = true">Next</v-btn>
                                        </v-col>
                                    </v-form>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-text>
                    </v-expansion-panel>

                    <!-- Review & Place Order Panel -->
                    <v-expansion-panel :disabled="!this.paymentPanel" class="mb-12">
                        <v-expansion-panel-title class="text-h6">
                            <v-icon icon="mdi-playlist-check" class="mr-3"></v-icon>
                            Review & Place Order

                            <template v-slot:actions="{ disabled }">
                                <v-icon :color="!disabled ? 'teal' : ''" :icon="!disabled ? 'mdi-check' : ''"></v-icon>
                            </template>
                        </v-expansion-panel-title>
                        <v-divider></v-divider>
                        <v-expansion-panel-text class="mt-4">
                            <v-row justify="center">
                                <v-col cols="12" sm="11" md="9" lg="8" style="min">
                                    <v-list>
                                        <v-list-item-title class="font-weight-bold text-h6 mb-1">Order
                                            information</v-list-item-title>
                                        <v-list-item border="sm">
                                            <div id="delivery-list">
                                                <p class="font-weight-bold text">Delivery address</p>
                                                <p>{{ customer.firstName }} {{ customer.lastName }}</p>
                                                <p>{{ customer.address }}</p>
                                                <p>{{ customer.postalCode }} {{ customer.city }}</p>
                                            </div>
                                        </v-list-item>
                                        <v-list-item-title
                                            class="font-weight-bold text-h6 mt-8 mb-1">Cart</v-list-item-title>
                                        <v-divider></v-divider>
                                        <v-list-item v-for="item in items" :key="item.id" density="compact"
                                            class="px-1">

                                            <template v-slot:prepend>
                                                <span class="mr-3">{{ item.quantity }}x</span>
                                                <span>{{ item.brand }} - {{ item.model }}</span>
                                            </template>

                                            <template v-slot:append>
                                                {{ item.price.toFixed(2) }} €
                                            </template>
                                        </v-list-item>
                                        <v-divider></v-divider>
                                        <v-list-item-title class="font-weight-bold text-h6 mt-8 mb-1">Shipping
                                            method</v-list-item-title>
                                        <v-divider></v-divider>
                                        <v-list-item class="pr-1">

                                            <template v-slot:prepend>
                                                <span> Home delivery: {{ shipping.method === 'Express' ? 'Express: 1-2days' : 'Standard: 3 - 5 days' }}</span>
                                            </template>

                                            <template v-slot:append>
                                                <span class="text-end">{{ this.shipping.cost }} {{ shipping.method ===
                                                    'Express' ? '€' : '' }}</span>
                                            </template>
                                        </v-list-item>
                                        <v-divider></v-divider>
                                        <v-list-item-title class="font-weight-bold text-h6 mt-8 mb-1">Payment
                                            method</v-list-item-title>
                                        <v-divider></v-divider>
                                        <v-list-item>
                                            {{ payment.method }}
                                        </v-list-item>
                                        <v-divider></v-divider>
                                    </v-list>

                                    <v-row justify="end" class="pa-4 mt-2 mr-n4">
                                        <v-card-item class="text-center">
                                            <v-card-text class="text-h6 font-weight-bold mb-2">
                                                Total: {{total.toFixed(2) }}€</v-card-text>
                                            <v-btn width="180px" class="text-overline" color="success"
                                                @click="placeOrder">Place
                                                Order</v-btn>
                                        </v-card-item>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card>
        </v-col>
    </v-container>
</template>

<script>
import Cart from "../components/Cart.vue";
import { useCartStore } from "@/stores/cartStore";
import { mapState, mapActions } from "pinia";


export default {
    name: "Checkout",
    components: {
        Cart,
    },
    data() {
        return {
            panel: 0,
            validCart: false,
            validCustomer: false,
            validCardPayment: false,
            validInvoice: false,
            cartPanel: false,
            customerPanel: false,
            shippingPanel: false,
            paymentPanel: false,
            rules: {
                required: value => !!value || 'Required.',
            },
            customer: {
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                address: "",
                postalCode: "",
                city: "",
            },
            shipping: {
                method: "",
                cost: "",
            },
            payment: {
                method: '',
                card: {
                    name: '',
                    number: '',
                    expiry: '',
                    cvv: ''
                },
                invoice: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    address: '',
                    postalCode: '',
                    city: '',
                },
            },
            radioBackground: 'radio-background',
            disableAllButtons: true,
        };
    },
    computed: {
        ...mapState(useCartStore, ["items", "total"]),
        total() {
            let baseTotal = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
            if (this.shipping.method === 'Express') {
                baseTotal += 15;
            }
            return baseTotal;
        },
    },
    watch: {
        'shipping.method'(newMethod) {
            if (newMethod === 'Express') {
                this.shipping.cost = 15;
            } else {
                this.shipping.cost = 'Free';
            }
        },
    },
    methods: {
        ...mapActions(useCartStore, ["finalizeOrder"]),
        nextPanel(index) {
            if (index === 0 && this.validCustomer) this.panel = 1;
            if (index === 1 && this.shipping.method) this.panel = 2;
            if (index === 2 && (this.validCardPayment || this.validInvoice)) this.panel = 3;
        },
        syncInvoiceWithCustomer() {
            const { firstName, lastName, email, phone, address, postalCode, city } = this.customer;
            this.payment.invoice = { firstName, lastName, email, phone, address, postalCode, city };
        },
        nextPanel() {
            this.panel++;
        },
        generateOrderNumber() {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
            return parseInt(`${year}${month}${day}-${random}`);
        },

        paymentMethod() {
            if (this.payment.method === 'Card Payment') {
                return this.payment.card
            } else if (this.payment.method === 'Invoice') {
                return this.payment.invoice
            }
        },
        placeOrder() {
            const paymentDetails = this.paymentMethod();
            const orderNumber = this.generateOrderNumber();
            const orderDetails = {
                items: this.items.map(item => ({
                    id: item.id,
                    brand: item.brand,
                    model: item.model,
                    size: item.size,
                    color: item.color,
                    material: item.material,
                    image: item.image,
                    quantity: item.quantity,
                    price: item.price,
                })),
                customer: this.customer,
                shipping: this.shipping.method,
                shippingCost: this.shipping.cost,
                paymentMethod: this.payment.method,
                paymentDetails: paymentDetails,
                orderNumber: orderNumber,
                total: this.total,
            };
            this.finalizeOrder(orderDetails);
            this.$router.push({ name: "Confirmation" });
        },
    },
};
</script>

<style scoped>
.radio-background {
    border-style: solid;
    border-color: #214761;
    background-color: #E4F2F7;
    border-width: 2px;
}

.v-expansion-panel-text :deep(.v-expansion-panel-text__wrapper) {
    padding: 12px !important;
}

@media screen and (max-width: 500px) {
    .v-list-item {
        font-size: 14px;
    }

    .cart-col {
        font-size: 14px;
    }
}

@media screen and (max-width: 400px) {

    .v-expansion-panel-text :deep(.v-expansion-panel-text__wrapper) {
        padding: 8px !important;
    }

    .v-list-item {
        padding: 5px !important
    }

    .v-list-item :deep(.v-list-item__prepend) {
        max-width: 180px;
    }

    #shipping-text {
        font-size: 12px;
    }

    #delivery-list {
        padding-left: 4px;
    }
}
</style>