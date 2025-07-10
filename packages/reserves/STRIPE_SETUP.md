# Stripe Payment Integration Setup

## Required Configuration

### 1. Stripe Keys
- Go to your [Stripe Dashboard](https://dashboard.stripe.com/)
- Get your **Publishable Key** (starts with `pk_test_` for testing)
- Replace `pk_test_...` in `src/config/stripe.ts`

## Expo Go Limitations

✅ **Works in Expo Go:**
- PaymentSheet (card payments)
- CardField (card data capture)

❌ **Does NOT work in Expo Go:**
- Apple Pay
- Google Pay

To use Apple Pay/Google Pay you need:
- Development build: `npx expo run:ios` or `npx expo run:android`
- Or app published in stores

## Usage

Payment is automatically integrated into the reservation confirmation flow:

1. User confirms the reservation
2. **Reservation is created** with status `"payment-pending"`
3. **Payment is processed** with Stripe using the `reservationId`
4. **If payment is successful** → Backend changes status to `"confirmed"`
5. **If it fails** → Backend changes status to `"cancelled"`

## Testing

For testing use Stripe's test cards:
- **Visa**: 4242424242424242
- **Mastercard**: 5555555555554444
- **Any future date and 3-digit CVC** 