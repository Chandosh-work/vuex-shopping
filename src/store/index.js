import Vuex from 'vuex';
import Vue  from 'vue';

// import actions from "@/store/action";

import cart from "@/store/modules/cart";
import products from "@/store/modules/product";


Vue.use(Vuex);


export default  new Vuex.Store({

    modules: {
        cart,
        products
    },
    
    // Equivalent to data in Component
    state: {  
     
  
    },

    // Equivalent to Computed in Component
    getters: { 

    },

    // Equivalent to Methods in Component
    // Usually used to make Api calls
    // Should not update state in actions
    actions:  {
        
    },

    // The values in the store are updated using mutations
    mutations: {   
    }


})
