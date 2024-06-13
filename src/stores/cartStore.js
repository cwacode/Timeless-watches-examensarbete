import { defineStore } from 'pinia';
import { supabase } from "../lib/supabaseClient";

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cartItems')) || [], // Initialize state from local storage
    orderDetails: null,
  }),

  getters: {
    itemCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    total: (state) => state.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
  },
  
  actions: {
    async addToCart(product, quantity = 1) {
      const existingItem = this.items.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({
          id: product.id,
          model: product.model,
          price: product.price,
          image: product.image_url,
          brand: product.brand_name,
          quantity,
        });
      }
      this.saveItems();
      this.adjustStock(product.id, -quantity);
    },

    async subtractFromCart(productId) {
      const item = this.items.find(item => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        this.saveItems();
        this.adjustStock(productId, 1); 
      } else if (item && item.quantity === 1) {
        this.removeFromCart(productId, 1);
      }
    },
    
    async removeFromCart(productId, quantity) {
      const item = this.items.find(item => item.id === productId);
      if (!item) return;
    
      // Remove the item and update stock
      this.items = this.items.filter(i => i.id !== productId);
      this.saveItems();
      this.adjustStock(productId, quantity);
    },
       
    clearCart() {
      this.items = [];
      this.saveItems();
      localStorage.removeItem('cartItems');
    },
    saveItems() {
      localStorage.setItem('cartItems', JSON.stringify(this.items));
    },



    async adjustStock(productId, quantityChange) {
      try {
        const { data: currentStockData, error: fetchError } = await supabase
          .from('watches')
          .select('stock')
          .eq('id', productId)
          .single();
        if (fetchError) throw fetchError;
        
        const updatedStock = currentStockData.stock + quantityChange;
    
        const { data, error } = await supabase
          .from('watches')
          .update({ stock: updatedStock })
          .match({ id: productId });
        if (error) throw error;
      } catch (error) {
        console.error('Error updating stock:', error.message);
      }
    },
  
    async finalizeOrder(details) {
      this.orderDetails = details;
      localStorage.setItem('orderDetails', JSON.stringify(details));
      
      const orderData = {
          customer_details: JSON.stringify(details.customer),
          total: details.total,
          items: JSON.stringify(details.items),
          status: 'pending',
          order_number: details.orderNumber,
          shipping_method: details.shipping,
          payment_method: details.paymentMethod,
          payment_details: JSON.stringify(details.paymentDetails),
      };
      try {
          const { data, error } = await supabase
              .from('orders')
              .insert([orderData]);
          if (error) {
              console.error('Error creating order:', error);
              throw error;
          }
      } catch (error) {
          console.error('Error registering order:', error);
      }
      this.clearCart();
    },
}
});
