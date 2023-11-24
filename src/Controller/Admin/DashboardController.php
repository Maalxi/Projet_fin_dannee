<?php

namespace App\Controller\Admin;

use App\Entity\Category;
use App\Entity\Product;
use App\Entity\Promotion;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        // return parent::index();

        $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        return $this->redirect($adminUrlGenerator->setController(CategoryCrudController::class)->generateUrl());

    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('No Name');
    }

    public function configureMenuItems(): iterable
    {
        // SECTION
        yield MenuItem::section('Boutiques');

        // LIEN VERS PAGE DE CRUD
        yield MenuItem::linkToCrud('Catégories', 'fa-solid fa-clipboard-list', Category::class);
        yield MenuItem::linkToCrud('Produits', 'fa-solid fa-list', Product::class);
        yield MenuItem::linkToCrud('Promotions', 'fa-solid fa-gift', Promotion::class);


        // SECTION
        yield MenuItem::section('Services');

        // LIEN VERS PAGE DE CRUD
        yield MenuItem::linkToCrud('Client', 'fa-solid fa-user', User::class);


    }
}
