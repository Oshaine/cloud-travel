<template>
  <v-rating
    :value="rating"
    :length="length"
    color="#E9BF2D"
    background-color="grey darken-1"
    empty-icon="$ratingFull"
    hover
    small
  ></v-rating>
</template>
<script>
export default {
  name: "StarRating",
  props: {
    rating: {
      type: Number,
    },
    length: {
      type: Number,
      required: true,
    },
  },
};
</script>
