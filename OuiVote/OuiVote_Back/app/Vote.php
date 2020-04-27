<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{

    public $primarykey ='id';

    protected $fillable = [
        'users_id', 'sondages_id', 'votePour','voteContre', 'voteNull'
    ];

    public $timestamps = true;

    public function test()
    {
        return $this->belongsTo(User::class);
    }
    public function test2()
    {
        return $this->belongsTo(Sondage::class)->latest();
    }
}
