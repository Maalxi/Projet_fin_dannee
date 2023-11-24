<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpClient\HttpClient;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(ProductRepository $productRepository): Response
    {
        $products = $productRepository->findAll();

        // Récupérez les catégories de l'API
        $client = HttpClient::create();
        $response = $client->request('GET', 'https://127.0.0.1:8000/api/categories');
        $data = $response->toArray();
        $categories = $data['hydra:member'];

        // Récupérez les prix des produits à partir de l'API
        $productPrices = [];
        foreach ($products as $product) {
            $productId = $product->getId();
            $response = $client->request('GET', 'https://127.0.0.1:8000/api/products/' . $productId);
            $data = $response->toArray();
            $productPrices[$productId] = $data['price'];
        }
        
        return $this->render('home/index.html.twig', [
            'controller_name' => 'HomeController',
            'products' => $products,
            'categories' => $categories,
            'productPrices' => $productPrices,
        ]);
    }
}

