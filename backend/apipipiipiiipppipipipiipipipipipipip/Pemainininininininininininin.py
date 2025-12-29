from fastapi import APIRouter


Router=APIRouter()





Pemain=[]
@Router.post("/Pemain")
def MembuatPemain(Nama_Pemain:str):
    Pemain.append(Nama_Pemain)
    return f"{Nama_Pemain} berhasil ditambahkan"

@Router.get("/Pemain")
def MelihatPemain():
    return Pemain

@Router.delete("/Pemain")
def Hapus(Urutan:int):
    delete=Pemain[Urutan-1]
    del Pemain[Urutan-1]
    return f"Pemain {delete} telah dihapus"

@Router.put("/Pemain")
def Membenarkan(Urutan:int,Mengganti:str):
    Nama=Pemain[Urutan-1]
    Pemain[Urutan-1]=Mengganti
    return f"{Nama} berhasil diubah menjadi  {Mengganti}"
