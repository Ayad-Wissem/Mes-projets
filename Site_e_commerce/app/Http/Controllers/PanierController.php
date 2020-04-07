<?php

namespace App\Http\Controllers;

use App\Model\Utilisateur;
use App\Model\Panier;
use App\Model\Produit;

class PanierController extends Controller
{
    public function afficher() 
    {
        if(auth()->guest()) {
            return redirect('/login')->withErrors([
                'email' => 'Vous devez etre connecté pour accéder à cette page.'
            ]);
        }
        return view('panier');
    }

    public function getUserPanier($utilisateur_id) 
    {
        $panier = Panier::where($utilisateur_id);
        // $produit = Produit::where($produit_id)
        return view('panier', ['panier', $panier]);
    }
    
    public function addProduit($utilisateur_id, $produit_id) 
    {
        $panier = Panier::where('utilisateur_id', $utilisateur_id)->first();
        // $panier = Panier::find($panier_id);
        $produit = Produit::find($produit_id);
        echo json_encode($panier->prix_total); die;

        $produit->panier_id = $panier->id;
        $produit->save();
    }
}
