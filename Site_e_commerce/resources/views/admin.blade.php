@extends('layouts.layout')
<link href="{{ asset('css/styleadmin.css') }}" rel="stylesheet">
@section('content')
<h1>PAGE ADMIN</h1>
    <hr>

    <form action="" method="post" align="center">
        {{csrf_field()}}
        
        <div class="container">
 
            <label for="gliss"><b>Glisser une image</b></label>
            <input type="file" required placeholder="Glisser une image"
            name="gliss"><br><br>

            <label for="name"><b>Nom du produit</b></label>
            <input type="text" required placeholder="Entrer le nom du produit"
            name="name"><br><br>

            <label for="desc"><b>Description du produit</b></label>
            <textarea class="desc" name="desc" placeholder="Ecrire ici..."
            rows="5" cols="40"></textarea><br><br>

            <label for="prix"><b>Prix du produit : </b></label>
            <input type="number" step="0.01"
            class="prixnbr" name="prix"
            min="0" max="99999" required placeholder="en euros..."><br><br><br>
            
            <label for="cat"><b>Catégorie</b></label>
            <input type="text" required placeholder="Entrer catégorie"
            name="cat"><br><br>

            <label for="quantity"><b>Quantité disponible : </b></label>
            <input type="number" step="0.01"
            class="nbr" name="quantity"
            min="0" max="1000" required placeholder="Indiquer ici..."><br><br><br>

            <button type="submit">Ajouter</button>
        </div>
    </form>
@endsection