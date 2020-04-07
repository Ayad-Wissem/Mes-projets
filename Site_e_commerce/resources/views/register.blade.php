@extends('layouts.layout')
<link href="{{ asset('css/register.css') }}" rel="stylesheet">
@section('content')
<h1>Inscription</h1>
<hr>

<form action="" method="POST" align="center">
    {{csrf_field()}}

    <div class="container">
    
        <label for="name"><b>Nom d'utilisateur</b></label>
        <input type="text" required placeholder="Entrer votre nom d'utilisateur"
        name="name" value="{{ old('name') }}"><br><br>

        <label for="mail"><b>Email</b></label>
        <input type="email" required placeholder="Entrer votre email"
        name="email" value="{{ old('email') }}"><br><br>
        @if( $errors->has('email'))
            <p>{{ $errors->first('email') }}</p>
        @endif

        <label for="mdp"><b>Mot de passe</b></label>
        <input type="password" required placeholder="Entrer mot de passe"
        name="password"><br><br>
        @if( $errors->has('password'))
            <p>{{ $errors->first('password') }}</p>
        @endif

        <label for="cmdp"><b>Confirmation de mot de passe</b></label>
        <input type="password" required placeholder="Confirmer votre mot de passe"
        name="password_confirmation"><br><br>
        @if( $errors->has('password_confirmation'))
            <p>{{ $errors->first('password_confirmation') }}</p>
        @endif

        <button type="submit">Enregistrer</button>             
    </div>
</form>
@endsection