<template>
  <div :class="`left-filter ${customClass}`">
    <v-sheet class="filter-container" rounded="lg" min-height="142px">
      <v-card class="per-night" flat color="transparent">
        <v-subheader
          ><h4>Price per night</h4>
          <v-spacer></v-spacer>
          <h4 class="clear">CLEAR</h4></v-subheader
        >

        <v-card-text>
          <v-range-slider
            v-model="range"
            :max="max"
            :min="min"
            hide-details
            thumb-color="#00000"
            track-color="#DDDDDD"
            track-fill-color="#00A1E5"
            :tick-size="1"
            class="align-center mb-3"
          >
          </v-range-slider>
          <div class="d-flex">
            <v-text-field
              :value="`SGD ${range[0]}`"
              class="mt-0 pt-0"
              outlined
              type="text"
              dense
              @change="$set(range, 0, $event)"
            ></v-text-field>
            <v-divider></v-divider>
            <v-text-field
              :value="`SGD ${range[1]}`"
              class="mt-0 pt-0"
              outlined
              type="text"
              dense
              @change="$set(range, 1, $event)"
            ></v-text-field>
          </div>
        </v-card-text>
      </v-card>
    </v-sheet>
    <!-- Reviews -->
    <div class="reviews">
      <v-sheet class="filter-container" rounded="lg" min-height="142px">
        <v-card class="per-night" flat color="transparent">
          <v-subheader>
            <h4>Reviews</h4>
            <v-spacer></v-spacer>
            <h4 class="clear">CLEAR</h4>
          </v-subheader>
          <v-card-text>
            <v-checkbox v-for="review in reviews" :key="review.id">
              <template v-slot:label>
                <small>{{ review.text }}</small>
                <v-spacer></v-spacer>
                <small>{{ review.number }}</small>
              </template>
            </v-checkbox>
          </v-card-text>
        </v-card>
      </v-sheet>
    </div>
    <!-- Star Rating -->
    <div class="reviews">
      <v-sheet class="filter-container" rounded="lg" min-height="142px">
        <v-card class="per-night" flat color="transparent">
          <v-subheader>
            <h4>Star rating</h4>
            <v-spacer></v-spacer>
            <h4 class="clear">CLEAR</h4>
          </v-subheader>
          <v-card-text>
            <v-checkbox v-for="rating in stars" :key="rating.id">
              <template v-slot:label>
                <small>
                  <star-rating
                    :rating="rating.rating"
                    :length="rating.rating"
                  />
                </small>
                <v-spacer></v-spacer>
                <small>{{ rating.number }}</small>
              </template>
            </v-checkbox>
          </v-card-text>
        </v-card>
      </v-sheet>
    </div>
    <div class="reviews">
      <v-sheet class="filter-container" rounded="lg" min-height="142px">
        <v-card class="per-night" flat color="transparent">
          <v-subheader>
            <h4>Hotel name</h4>
          </v-subheader>
          <v-card-text>
            <v-combobox
              placeholder="e.g. Hilton, Ibis ..."
              flat
              outlined
              dense
              append-icon="mdi-magnify"
            ></v-combobox>
          </v-card-text>
        </v-card>
      </v-sheet>
    </div>
    <div class="reviews">
      <check-box-filter title="Reservation policy" :data="reservation" />
    </div>
    <div class="reviews">
      <check-box-filter title="Meal plan" :limit="2" :data="meal_plan" />
    </div>
    <div class="reviews">
      <check-box-filter
        title="Property type"
        :limit="3"
        :data="property_type"
      />
    </div>
  </div>
</template>
<script>
import CheckBoxFilter from "./CheckBoxFilter.vue";
import StarRating from "./StarRating.vue";
export default {
  components: { CheckBoxFilter, StarRating },
  name: "LeftFilter",
  props: {
    customClass: {
      type: String,
    },
  },
  data() {
    return {
      min: 0,
      max: 1000,
      range: [0, 550],
      reviews: [
        {
          text: "Excellent",
          number: 999,
        },
        {
          text: "Very Good",
          number: 999,
        },
        {
          text: "Good",
          number: 999,
        },
        {
          text: "Fair",
          number: 999,
        },
        {
          text: "Poor",
          number: 999,
        },
        {
          text: "No review",
          number: 999,
        },
      ],

      stars: [
        {
          rating: 5,
          number: 999,
        },
        {
          rating: 4,
          number: 999,
        },
        {
          rating: 3,
          number: 999,
        },
        {
          rating: 2,
          number: 999,
        },
        {
          rating: 1,
          number: 999,
        },
      ],
      reservation: [
        {
          text: "Free cancellation",
          number: 999,
        },
        {
          text: "Book now, pay later",
          number: 999,
        },
        {
          text: "Pay at hotel",
          number: 999,
        },
      ],
      meal_plan: [
        {
          text: "Room only",
          number: 999,
        },
        {
          text: "Breakfast",
          number: 999,
        },
        {
          text: "Lunch",
          number: 999,
        },
        {
          text: "Dinner",
          number: 999,
        },
        {
          text: "Half board",
          number: 999,
        },
        {
          text: "Full board",
          number: 999,
        },
        {
          text: "All inclusive",
          number: 999,
        },
      ],
      property_type: [
        {
          text: "Hotel",
          number: 999,
        },
        {
          text: "Hostel/Backpacker accomodation",
          number: 999,
        },
        {
          text: "Apartment",
          number: 999,
        },
        {
          text: "Aparthotel",
          number: 999,
        },
        {
          text: "Resort",
          number: 999,
        },
        {
          text: "Inn",
          number: 999,
        },
        {
          text: "Motel",
          number: 999,
        },
        {
          text: "Bed & breakfast",
          number: 999,
        },
        {
          text: "Guesthouse",
          number: 999,
        },
        {
          text: "Condo",
          number: 999,
        },
        {
          text: "All-inclusive property",
          number: 999,
        },
        {
          text: "Hostal",
          number: 999,
        },
      ],
    };
  },
};
</script>
