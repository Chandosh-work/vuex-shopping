import shop from "@/api/shop.js";

export default {
    namespaced: true,

    state: {
        items: [], //{id, quantity}
        checkoutStatus: null
    },
    getters: {

        cartProducts(state, getters, rootState, rootGetters) {
            return state.items.map((cartItem) => {
                 const product = rootState.products.items.find(product => product.id === cartItem.id);
                 return {
                     title: product.title,
                     price: product.price,
                     quantity: cartItem.quantity
                 }
            })
        },
         cartTotal(state, getters) {
             return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
        },

    },
    mutations: {
        pushProductToCart(state, productId) {
            state.items.push({id: productId, quantity: 1});
        },
        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++;
        },
        emptyCart(state) {
            state.items = [];
        },
        setCheckoutStatus(state, status) {
            state.checkoutStatus = status;
        }
    }, 
    actions: {
        addProductToCart({state, getters, commit, rootState, rootGetters}, product) {
            if(rootGetters['products/productIsInStock'](product) > 0) {
                const cartItem = state.items.find(item => item.id === product.id);
                if(!cartItem) {
                    commit('pushProductToCart', product.id)
                } else {
                    // Increment quanitity
                    commit('incrementItemQuantity', cartItem)
                }
                commit('products/decrementProductInventory', product, {root:true})
            }
        },
        checkout({state, commit}) {
            shop.buyProducts(state.items, ()=> {
                commit('emptyCart');
                commit('setCheckoutStatus', 'success')
            },
            ()=> {
                commit('setCheckoutStatus', 'failure')
            }  
            )
        }
    }
}