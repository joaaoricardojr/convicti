<template>
  <aside class="login-body">
    <picture class="logo">
      <img src="../../assets/images/logo.svg" alt="Logo" class="logo-image" />
      <span>CONVIC<span class="colored-letters">TI</span></span>
    </picture>
    <section class="login-section">
      <div class="welcome-text">Bem-vindo de Volta</div>
      <div class="credentials-text">Insira suas credenciais para acessar a plataforma</div>
      <div class="input-group">
        <input v-model="email" class=”input-class” type="email" placeholder="Seu e-mail" @input="clearErrors" @keydown.enter="login" />
        <p v-if="emailError" style="color: red;">{{ emailError }}</p>
      </div>
      <div class="input-group">
        <input v-model="password" class=”input-class” type="password" placeholder="Sua senha" @input="clearErrors" @keydown.enter="login" />
        <p v-if="passwordError" style="color: red;">{{ passwordError }}</p>
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      </div>
      <button class="login-button" @click="login" :disabled="loading">
        <span class="login-span" v-if="loading">Carregando...</span>
        <span class="login-span" v-else>Entrar</span>
      </button>
    </section>
    <section class="dashboard-section">
      <div class="ellipse2">
      </div>
      <div class="ellipse1"></div>
      <picture class="dashboard">
        <img src="../../assets/images/dashboard.svg" alt="Dashboard" class="dashboard-image" />
        <!-- <div class="elipse"></div> -->
      </picture>
    </section>
  </aside>
</template>

<script>
import AuthService from '../../services/auth.service';

export default {
  beforeRouteEnter(to, from, next) {
    if (AuthService.isLoggedIn()) {
      next('/dashboard');
    } else {
      next();
    }
  },
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      errorMessage: '',
      loading: false,
    };
  },
  methods: {
    login() {
      if (!this.email) {
        this.emailError = 'O e-mail é obrigatório.';
        return;
      }
      this.emailError = '';

      if (!this.validateEmail(this.email)) {
        this.emailError = 'Formato de email inválido.';
        return;
      }
      this.emailError = '';

      if (!this.password) {
        this.passwordError = 'A senha é obrigatória.';
        return;
      }
      this.passwordError = '';

      this.loading = true;
      AuthService.login(this.email, this.password)
        .then(() => {
          this.$router.push('/dashboard');
        })
        .catch((error) => {
          if (error.message === 'E-mail incorreto.') {
            this.emailError = error.message;
            this.passwordError = '';
          } else if (error.message === 'Senha incorreta.') {
            this.passwordError = error.message;
            this.emailError = '';
          } else {
            this.errorMessage = error.message || 'Erro ao fazer login. Tente novamente.';
            this.emailError = '';
            this.passwordError = '';
          }
          this.password = '';
        })
        .finally(() => {
          this.loading = false;
        });
    },
    validateEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
    clearErrors() {
      this.errorMessage = '';
      this.emailError = '';
      this.passwordError = '';
    },
  },
};
</script>

<style lang="scss" src="./style.scss" scoped />