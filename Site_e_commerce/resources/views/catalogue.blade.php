@extends('layouts.layout')
<link href="{{ asset('css/catalogue.css') }}" rel="stylesheet">
@section('content')

<h1>Catalogue</h1>
    @foreach($produits as $produit)
        <div class="produit">
            <p id="titre">{{ $produit['nom'] }}</p>
            <img class="image" src="images/{{ $produit['image'] }}" alt="image">
            <p style="max-height: 140px; overflow-y: auto;">{{ $produit['description'] }} </p>
            <a href="/produit/{{ $produit['id'] }}"><button type="button" id="info">Info</button></a>
            <button type="button" onclick="alert ('Achat effectué avec succès')" id="achat">Achat direct</button> 
        </div>
    @endforeach
@endsection