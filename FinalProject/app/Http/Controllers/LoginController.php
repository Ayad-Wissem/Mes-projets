<?php

namespace App\Http\Controllers;

use App\Model\Utilisateur;
use Symfony\Component\Mime\Header\IdentificationHeader;

class LoginController extends Controller
{
    public function afficher() {
        return view('login');
    }
    
    public function traitement() {
        request()->validate([
            'email' => ['required', 'email'],
            'password' =>['required'],
        ]);

       $resultat = auth()->attempt([
            'email' => request('email'),
            'password' => request('password'),
        ]);

        if ($resultat) {
            return redirect('/catalogue');
        }
        return back()->withInput()->withErrors([
            'email' => 'Identifiants incorrects.'
        ]);
        
    }
}
