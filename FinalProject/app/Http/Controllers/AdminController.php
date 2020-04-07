<?php

namespace App\Http\Controllers;

use App\Model\Utilisateur;
use App\Model\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    public function afficher() {
        if(auth()->check()){
            return view('admin');
        }
        return redirect('/');
    }
    
    public function traitement(Request $req)
    {
        request()->validate([
            'gliss'    => ['required'],
            'name'     => ['required'],
            'desc'     => ['required'],
            'prix'     => ['required'],
            'cat'      => ['required'],
            'quantity' => ['required'],
        ]);

        $produit = new Produit;
        
        $produit->nom         = request('name');
        $produit->description = request('desc');
        $produit->catégorie   = request('cat');
        $produit->prix        = request('prix');
        $produit->image       = request('gliss');
        $produit->quantité    = request('quantity');
        
        $produit->save();

        return redirect('/catalogue');
    }

}
