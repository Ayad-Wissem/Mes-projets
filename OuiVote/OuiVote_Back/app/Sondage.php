<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Sondage extends Model
{
    public $primarykey ='id';

    protected $fillable = [
        'titre', 'description', 'users_id', 'category', 'date', 'hour'
    ];

    public $timestamps = true;

    public function user()
    {
        return $this->belongsTo(User::class);
        return $this->hasMany(Sondage::class)->latest();
        return $this->hasMany(Vote::class)->latest(); 
    }
}