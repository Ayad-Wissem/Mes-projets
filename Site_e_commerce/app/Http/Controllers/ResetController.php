<?php

namespace App\Http\Controllers;

use App\Model\Utilisateur;
use Illuminate\Http\Request;

class ResetController extends Controller
{
    public function afficher() 
    {
        return view('reset');
    }
    public function traitement() 
    {
        request()->validate()([
            'email' =>['required', 'email'],
        ]);

        $resultat = auth()->attempt([
            'email' => request('email')
        ]);

        if($resultat) {
            return redirect('/login');
        }
        return back()->withInput()->withErrors([
            'email' => 'Identifiants incorrects.'
        ]);

        // dd($request->all());

    }
}
