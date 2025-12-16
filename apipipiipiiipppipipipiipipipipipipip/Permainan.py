import random
from fastapi import APIRouter
from Pemainininininininininininin import Pemain

Router=APIRouter()

@Router.get("/Acak-acakan")
def Random():
    try:
        Sesuai=random.choice(Pemain)
        return f"{Sesuai}"
    except:
        return"Tidak ada pemainnya!"
    


@Router.get("/Acak-TruthorDare")
def Acak():
    TruthOrDare=random.choice(["Truth","Dare"])
    return f"Kamu mendapatkan {TruthOrDare}"