// This is your test publishable API key.
const stripe = Stripe("pk_test_51OyuQMJY2oOkVHhlvJzAASnmxDjyE3qOYYj8e98OL8XZNfIffQWed46BnIfLcqEuC11QTs6nni78ZBmTfcBNVbNT0037ZwsqRQ");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}