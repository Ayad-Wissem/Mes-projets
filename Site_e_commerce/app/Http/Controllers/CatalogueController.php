<?php

namespace App\Http\Controllers;

use App\Model\Utilisateur;
use App\Model\Produit;

class CatalogueController extends Controller
{
    public function afficher() 
    {   
        $produits = Produit::all();
        return view('catalogue', ["produits" => $produits]);
    }

    public function deconnexion()
    {
        
        auth()->logout();

        return redirect('/');

    }

    public function findProduitById($produit_id)
    {
        $produit = Produit::find($produit_id);

        return view('produit', ["produit" => $produit]);
    }
}
