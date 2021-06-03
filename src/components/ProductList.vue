<template>
    <div>
        <h1>Product List</h1>
        <img v-if="loading"
        src="https://i.imgur.com/JfPpwOA.gif" alt="Load">
        <ul v-else>
            <li v-for="product in products" :key="product.id">{{product.title}} - {{product.price | currency}}

                <button v-bind:disabled="!productIsInStock(product)" @click="addProductToCart(product)">Add to Cart</button>
            </li>
        </ul>
    </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from "vuex";

export default {

    data() {
        return {
            loading: false
        }
    },

    methods: {
        ...mapActions({
            fetchProducts: 'products/fetchProducts',
            addProductToCart: 'cart/addProductToCart'
        }),
        // addProductToCart(product) {

            // this.$store.dispatch('addProductToCart', product);
        // }
    },
    // methods: {
 
    // },

    
    computed: {
        ...mapState({
            products: state => state.products.items 
        }),

        ...mapGetters('products', {
            productIsInStock: 'productIsInStock'
        })
    },


    // computed: {
    //     products() {
    //         return this.$store.state.products
    //     },
    //     productIsInStock() {
    //         return this.$store.getters.productIsInStock;
    //     },
    // },

    created() {
        this.loading = true;
        this.fetchProducts().then(() => {
            this.loading = false;
        })
        // this.$store.dispatch('fetchProducts').then(() => {
        //     this.loading = false;
        // })
 
    },



}
</script>