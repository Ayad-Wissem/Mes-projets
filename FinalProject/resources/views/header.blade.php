<link href="{{ asset('css/styleheader.css') }}" rel="stylesheet">
<div class="header">
    <nav>
        <img src="images/CA.png" width="100" height="70" alt="logo">
        <ul>
            <li><a href="catalogue">Accueil</a></li>
            @if(auth()->check())
            <li><a href="/catalogue">Catalogue</a></li>
                <li><a href="/utilisateur/{{ Auth::user()->id }}/panier">Mon panier</a></li>
                <li><a href="/deconnexion">Déconnexion</a></li>
                <a class="/login">{{ Auth::user()->email }}</a>
                @else(!auth()->check())
                <li><a href="login">Connexion</a></li>
            @endif
        </ul>
    </nav>
</div>