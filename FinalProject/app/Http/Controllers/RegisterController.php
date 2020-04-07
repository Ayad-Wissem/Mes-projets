<?php

namespace App\Http\Controllers;

use App\Model\Utilisateur;
use App\Model\Panier;

class RegisterController extends Controller
{
    public function afficher() {
        return view('register');
    }

    public function traitement() {
        request()->validate([
            'email'=>['required', 'email'],
            'password'=>['required', 'confirmed'],
            'password_confirmation'=>['required'],
    
        ]);
    
        $utilisateur = new Utilisateur;
        $utilisateur->email = request('email');
        $utilisateur->password = bcrypt(request('password'));
        
        $utilisateur->save();
        
        $panier = new Panier;
        
        $panier->utilisateur_id = $utilisateur->id;
        $panier->save();
        return view('login');
    }
}
