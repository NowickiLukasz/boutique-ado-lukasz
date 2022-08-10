var stripe_public_key = $('#id_stripe_public_key').text().slice(1, -1);
var client_secret= $('#id_client_secret').text().slice(1, -1);

var stripe = Stripe(stripe_public_key);
var elements = stripe.elements()
var style = {
    theme: 'stripe',
  
    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '2px',
      borderRadius: '4px',
      // See all possible variables below
    }
  };
var card = elements.create('card',  {style: style})


card.mount('#card-element')
