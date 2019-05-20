<template>
  <form
    @submit.prevent="submit"
  >
    <b-message>
      Enter developer credentials for <strong v-text="hydraUrl" />…
    </b-message>
    <b-notification
      v-if="error"
      :closable="false"
      type="is-danger"
      v-text="error"
    />
    <b-field label="Username">
      <b-input
        v-model="username"
        type="text"
        required
      />
    </b-field>
    <b-field label="Password">
      <b-input
        v-model="password"
        type="password"
        required
      />
    </b-field>
    <b-button
      type="is-primary"
      native-type="submit"
    >
      Log in
    </b-button>
  </form>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'LoginForm',
    data() {
      return {
        error: null,
        username: '',
        password: '',
      };
    },
    computed: {
      hydraUrl() {
        return process.env.VUE_APP_HYDRA_URL.replace(/^https?:\/\//, '');
      },
    },
    methods: {
      ...mapActions({
        logIn: 'devAuth/logIn',
      }),
      reset() {
        this.error = null;
        this.username = '';
        this.password = '';
      },
      async submit() {
        try {
          await this.logIn({
            username: this.username,
            password: this.password,
          });
        } catch (err) {
          this.error = err;
          return;
        }
        this.reset();
      },
    },
  };
</script>
