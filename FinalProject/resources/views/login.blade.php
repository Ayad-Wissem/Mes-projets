@extends('layouts.layout')
<link href="{{ asset('css/stylelogin.css') }}" rel="stylesheet">
@section('content')
<h1>Connexion</h1>
    <hr>

    <form action="" method="post" align="center">
    {{ csrf_field() }}
        <div class="container">
            
 
            <label for="name"><b>Email</b></label>
            <input type="email" required placeholder="Entrer votre email"
            name="email"><br><br>
            @if( $errors->has('email'))
                <p>{{ $errors->first('email') }}</p>
            @endif

            <label for="mdp"><b>Mot de passe</b></label>
            <input type="password" required placeholder="Entrer mot de passe"
            name="password"><br><br>
            @if( $errors->has('password'))
                <p>{{ $errors->first('password') }}</p>
            @endif

            <button type="submit">Connexion</button><br>
            <label>
                <input type="checkbox" 
                checked="checked" name="ssdm">
                Se souvenir de moi <br><br>
            </label>
            <mdp class="mdp">Oubli de <a href="reset">mot de passe ?</a></mdp>
            <mdp class="mdp"><a href="register">S'inscrire</a></mdp>

        </div>
    </form>
@endsection