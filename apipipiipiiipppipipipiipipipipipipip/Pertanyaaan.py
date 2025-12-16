from fastapi import APIRouter


Router=APIRouter()


Nanya=[]
@Router.post("/Pertanyaan")
def membuat(pertanyaan:str):
    Nanya.append(pertanyaan)
    return f"Pertanyaan {Nanya}"

@Router.get("/Pertanyaan")
def membaca():
    if len(Nanya)> 0:
        return f"{Nanya}"
    
    else:
        return "Belum ada pertanyaan!"

@Router.delete("/Pertanyaan")
def penghapusan(Urutan:int):
    hapus=Nanya[Urutan-1]
    del Nanya[Urutan-1]
    return f"Pertanyaan {hapus} telah dihapus."

@Router.put("/Pertanyaan")
def membenarkan(Urutan:int,Mengganti:str):
    Nama=Nanya[Urutan-1]
    Nanya[Urutan-1]=Mengganti
    return f"{Nama} berhasil diubah menjadi {Mengganti}"


