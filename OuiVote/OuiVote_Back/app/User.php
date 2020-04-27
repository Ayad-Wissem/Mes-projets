<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable 
{
    use HasApiTokens;
    use Notifiable;
    

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $with = array("votes");
    
    public $primarykey ='id';

    protected $fillable = [
        'name', 'email', 'password','valid', 'citie_id'
    ];

    public function posts()
    {
        return $this->hasMany(Sondage::class)->latest();
        return $this->hasMany(Projet::class)->latest();
        return $this->hasOne(Citie::class);
    }
    
    public function votes()
    {
        return $this->hasMany(Vote::class, 'users_id');
    }

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
