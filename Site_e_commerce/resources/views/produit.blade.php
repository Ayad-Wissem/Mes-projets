@extends('layouts.layout')
<link href="{{ asset('css/produit.css') }}" rel="stylesheet">

@section('content')
<div align=center>
    <div class="all" align=center>
        <h2 id="titre">{{ $produit['nom'] }}</h2>
            <div class="affichage" class="border">
                <img src="../images/{{ $produit['image'] }}" alt="One Piece tome 94" id="pimage"/>
            </div>
            <div class="ecriture">
                <p class="text">{{ $produit['description'] }}</p>
                <h3 id="price">{{ $produit['prix'] }}€</h3>
                <p>{{ $produit['catégorie'] }}</p>
                <p class="stock">Plus que: <a id="int">{{ $produit['quantité'] }}</a> exemplaires ! Dépêchez-vous !</p>
        
            <form action="{{ route('add.produit', [ Auth::user()->id, $produit['id'] ]) }}" method="post">
                    {{ method_field('PUT') }}
                    {{ csrf_field() }}
                <button type="submit">Ajouter au panier</button>    
            </form>

                
                <!-- <a href="/utilisateur/{{ Auth::user()->id }}/produit/{{ $produit['id'] }}"><button type="button" id="panier">Ajouter au panier</button></a> -->
            </div>
    </div>
</div>    
@endsection