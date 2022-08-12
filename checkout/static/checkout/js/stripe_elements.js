var stripePublicKey = $('#id_stripe_public_key').text().slice(1, -1);
var clientSecret= $('#id_client_secret').text().slice(1, -1);

var stripe = Stripe(stripePublicKey);
var elements = stripe.elements()

var card = elements.create('card')


card.mount('#card-element')

// handle real time validation errors on the card element

card.addEventListener('change', function (event) {
    var errorDiv = document.getElementById('card-errors');
    if (event.error) {
        var html = `
        <span class="icon" role="alert">
            <i class="fas fa-times"></i>
        </span>
        <span>${event.error.message}</span>
        `
        $(errorDiv).html(html);
    } else {
        errorDiv.textContent = '';
    }
})


//  handle form submit
var form = document.getElementById('payment-form');

form.addEventListener('submit', function(ev) {
    ev.preventDefault();
    card.update({'disabled': true})
    $('#submit-button').attr('disabled', true);
    $('#payment-form').fadeToggle(100);
    $('#loading-overlay').fadeToggle(100);
    stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card
        }
    }).then(function(result) {
        if (result.error) {
            var errorDiv = document.getElementById('card-errors');

            var html = `
                <span class="icon" role="alert">
                    <i class="fas fa-times"></i>
                </span>
                <span>${result.error.message}</span>
                `
                $(errorDiv).html(html);
                card.update({'disabled': false})
                $('#submit-button').attr('disabled', false)
                $('#payment-form').fadeToggle(100);
                $('#loading-overlay').fadeToggle(100);
        } else{
            if (result.paymentIntent.status === 'succeeded'){
                form.submit();
        }
        }
        
    })
})