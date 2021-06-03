<template>
    <div>
        <h1> Shopping Cart </h1>
        <ul>
            <li v-for="product in products" :key="product.id">
                {{product.title}} - {{product.price | currency}} - {{product.quantity}} 
            </li>
            <p>Cart Totla: {{total | currency}}</p>
            <button @click="checkout">Checkout</button>
            <p v-if="checkoutStatus">{{checkoutStatus}}</p>
        </ul>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {

    computed: {
        ...mapGetters('cart', {
            products: 'cartProducts',
            total: 'cartTotal'
        }),

        ...mapState('cart', {
            checkoutStatus: state => state.checkoutStatus
        })
    },
        methods: {
        ...mapActions('cart',['checkout'])
    }



    // computed: {
    //     products() {
    //         return this.$store.getters.cartProducts;
    //     },
    //     total() {
    //         return this.$store.getters.cartTotal;
    //     },
    // }
    
}
</script>