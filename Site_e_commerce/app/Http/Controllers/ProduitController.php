<?php

namespace App\Http\Controllers;

use App\Model\Utilisateur;

class ProduitController extends Controller
{
    public function afficher() {
        return view('produit');
    }
}
