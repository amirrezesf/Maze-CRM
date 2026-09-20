export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    if (typeof window !== 'undefined' && !customElements.get('ion-icon')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = '/ionicons/ionicons.esm.js';
      document.head.appendChild(script);
    }
  });
});
