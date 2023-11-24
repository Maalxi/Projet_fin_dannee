<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Annotation\Route;
use PayPal\Api\PaymentExecution;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Rest\ApiContext;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use PayPal\Api\Amount;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Transaction;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class PayPalController extends AbstractController
{
    private $params;

    public function __construct(ParameterBagInterface $params)
    {
        $this->params = $params;
    }

    #[Route('/paypal', name: 'app_pay_pal')]
    public function passerALaCaisse(UrlGeneratorInterface $urlGenerator)
    {
        // Generate the base URL
        $Base_Url = $urlGenerator->generate('app_pay_pal', [], UrlGeneratorInterface::ABSOLUTE_URL);

        // The rest of your code remains unchanged
        $apiContext = new ApiContext(
            new OAuthTokenCredential(
                $this->params->get('paypal.client_id'),
                $this->params->get('paypal.client_secret')
            )
        );

        // Créez un objet Payer PayPal
        $payer = new Payer();
        $payer->setPaymentMethod('paypal');

        // Créez un objet Amount pour définir le montant de la transaction
        $amount = new Amount();
        $amount->setTotal('80');
        $amount->setCurrency('EUR'); // Replace 'USD' with the appropriate currency code

        // Créez un objet Transaction PayPal
        $transaction = new Transaction();
        $transaction->setAmount($amount); // Assurez-vous d'ajouter l'objet Amount ici
        $transaction->setDescription('Test');

        // Créez un objet de paiement PayPal
        $payment = new Payment();
        $payment->setIntent('sale');
        $payment->setPayer($payer);
        $payment->setTransactions([$transaction]);

        $redirectUrls = new RedirectUrls();
        $redirectUrls->setReturnUrl($Base_Url . 'execute-payment') // Provide the appropriate URL here
            ->setCancelUrl($Base_Url . 'cancel-payment'); // Provide the appropriate URL here

        $payment->setRedirectUrls($redirectUrls);

        try {
            // Créez le paiement sur PayPal
            $payment->create($apiContext);
        } catch (\TypeError $e) {
            // Handle the error
            error_log("PayPal payment creation failed: " . $e->getMessage());
            return $this->redirectToRoute('app_home'); // Replace 'error_page' with the name of your error page route
        }

        // Récupérez l'URL d'approbation de PayPal
        $approvalUrl = $payment->getApprovalLink();

        // Redirigez l'utilisateur vers PayPal pour effectuer le paiement
        return new RedirectResponse($approvalUrl);
    }
}
