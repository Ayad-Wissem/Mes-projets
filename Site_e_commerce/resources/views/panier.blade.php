@extends('layouts.layout')
<link href="{{ asset('css/stylepanier.css') }}" rel="stylesheet">
@section('content')
<h3>Panier</h3>
{{csrf_field()}}

<table class="tb1">
    <tbody> 
        <tr>
            <th>Produit</th>
            <th>Prix unité</th>
            <th>Nombre d'unités</th>
            <th></th>
        </tr>
        <tr>
            <td><img src="../images/imageop.png" alt="op"></td>
            <td>6.99€</td>
                <td><select class="quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option></select></td>
                <td><button class="button" type="reset">Supprimer du panier</button>
            </td>
        </tr>
            
    </tbody>
    
</table>
<br><br>
<p class="tech">PRIX TOTAL : 6,99€</p>
@endsection