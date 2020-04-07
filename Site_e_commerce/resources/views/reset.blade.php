@extends('layouts.layout')
<link href="{{ asset('css/reset.css') }}" rel="stylesheet">
@section('content')
<h1>Récupérer votre compte</h1>
    <hr>
    <form action="/reset" method="POST">
    {{ csrf_field() }}
        <div class="container">
            <p>Renseignez votre adresse mail ci-dessous, nous vous enverrons un mot de passe généré par e-mail.</p>
            <br><br>
            <label for="mailrecup"><b>Adresse mail du compte :</b></label><br>
            <input type="email" required placeholder="Entrer email">
        
            <button type="submit">Récupérer mon mot de passe</button>
        </div>
    </form>
@endsection