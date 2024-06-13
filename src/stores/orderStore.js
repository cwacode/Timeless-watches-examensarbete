import { defineStore } from 'pinia';
import { supabase } from "../lib/supabaseClient";

function safeParseJSON(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Error parsing JSON:', error.message);
        return null;
    }
}

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [],
  }),
  actions: {

    async fetchOrders() {
        try {
            let { data: orders, error } = await supabase.from('orders').select('*');
            if (error) throw error;

            this.orders = orders.map(order => ({
                ...order,
                customer_details: safeParseJSON(order.customer_details),
                items: safeParseJSON(order.items)
            }));
        } catch (error) {
            console.error('Error fetching orders:', error.message);
        }
    },
    
    async createOrder(orderDetails) {
        if (!orderDetails) {
            console.error('Order details are required');
            return;
        }
        try {
            const { data, error } = await supabase
                .from('orders')
                .insert([orderDetails]);

            if (error) {
                console.error('Error creating order:', error.message);
                return;
            }

            if (data && data.length > 0) {
                console.log('Order created:', data[0]);
                this.orders.push({
                    ...data[0],
                    customer_details: safeParseJSON(data[0].customer_details),
                    items: safeParseJSON(data[0].items)
                });
            } else {
                throw new Error("No data returned on create.");
            }
        } catch (error) {
            console.error('Exception when creating order:', error);
        }
    },

    async updateOrder(orderId, orderData) {
        if (!orderId || !orderData) {
            console.error("Invalid order data or ID for updating");
            return;
        }

        try {
            const { data, error } = await supabase
                .from('orders')
                .update(orderData)
                .match({ id: orderId });

            if (error) {
                console.error('Error updating order:', error.message);
                return;
            }

            if (data && data.length > 0) {
                console.log('Order updated:', data[0]);
                const index = this.orders.findIndex(order => order.id === orderId);
                if (index !== -1) {
                    this.orders[index] = {
                        ...data[0],
                        customer_details: safeParseJSON(data[0].customer_details),
                        items: safeParseJSON(data[0].items)
                    };
                }
            } else {
                throw new Error("No data returned on update.");
            }
        } catch (error) {
            console.error('Failed to update order:', error.message);
        }
    },

    async deleteOrder(orderId) {
        try {
            const { error } = await supabase
                .from('orders')
                .delete()
                .match({ id: orderId });

            if (error) throw error;

            this.orders = this.orders.filter(order => order.id !== orderId);
        } catch (error) {
            console.error('Error deleting order:', error.message);
            throw error;
        }
    },
  }
});
