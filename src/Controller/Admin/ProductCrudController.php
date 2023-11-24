<?php

namespace App\Controller\Admin;

use App\Entity\Product;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;

class ProductCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Product::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IntegerField::new('id')->hideOnForm()->hideOnIndex(),
            ImageField::new('image', 'Image')
                ->setBasePath('/uploads/images')
                ->setUploadDir('public/uploads/images') 
                ->setUploadedFileNamePattern('[randomhash].[extension]')
                ->setRequired(false),
            TextField::new('name', 'Nom'),
            IntegerField::new('inventory', 'Inventory'),
            MoneyField::new('price', 'Prix')->setCurrency('EUR')->setStoredAsCents(false),
            TextField::new('description', 'Description')->hideOnIndex(),
        ];
    }
}
