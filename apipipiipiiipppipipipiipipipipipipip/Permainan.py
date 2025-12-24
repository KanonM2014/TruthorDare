import random
from fastapi import APIRouter
from .Pemainininininininininininin import Pemain
from .Pertanyaaan import Nanya
from .Tantangan import Perintah
Router=APIRouter()

@Router.get("/Acak-acakan")
def Random():
    try:
        Sesuai=random.choice(Pemain)
        return f"{Sesuai}."
    except:
        return"Tidak ada pemainnya!"
    
@Router.get("/Acak-TruthorDare")
def Acak():
    TruthOrDare=random.choice(["Truth","Dare"])
    return f"Kamu mendapatkan {TruthOrDare}."

@Router.get("/Acak Pertanyaan")
def Putar():
    Pertanyaan=random.choice(Nanya)
    return f"Kamu mendapatkan {Pertanyaan}."

@Router.get("/Acak Tantangan")
def Around():
    Tantangan=random.choice(Perintah)
    return f"Kamu mendapatkan {Tantangan}."