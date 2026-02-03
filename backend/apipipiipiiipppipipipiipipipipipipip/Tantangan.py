from fastapi import APIRouter


Router=APIRouter()



Perintah=[]
@Router.post("/Tantang")
def Membuat(Tantangan:str):
    Perintah.append(Tantangan)
    return f"Tantangan {Perintah}"

@Router.get("/Tantang")
def Membaca():
    if len(Perintah)>0:
        return Perintah

    else:
        return []
    
@Router.delete("/Tantang")
def Penghapusan(Urutan:int):
    hapusan=Perintah[Urutan-1]
    Perintah.pop(Urutan-1)
    return f"Pertanyaan {hapusan} telah dihapus"

@Router.put("/Tantang")
def Membenarkan(Urutan:int,Mengganti:str):
    nama=Perintah[Urutan-1]
    Perintah[Urutan-1]=Mengganti
    return f"{nama} telah diubah menjadi {Mengganti}"