from fastapi import FastAPI
import random
from apipipiipiiipppipipipiipipipipipipip.Pemainininininininininininin import Router as pemain_router
from apipipiipiiipppipipipiipipipipipipip.Pertanyaaan import Router as pertanyaan_router
from apipipiipiiipppipipipiipipipipipipip.Tantangan import Router as tantangan_router
from apipipiipiiipppipipipiipipipipipipip.Permainan import Router as permainan_router

app=FastAPI(
    title="=====Truth or Dare=====",
    summary="Aplikasi ini untuk bermain Truth or Dare.",
    description="Aplikasi untuk Truth or Dare.",
    version="1.0.0"
)

app.include_router(router=pemain_router,tags=["Pemain"])
app.include_router(router=pertanyaan_router,tags=["Pertanyaan"])
app.include_router(router=tantangan_router,tags=["Tantangan"])
app.include_router(router=permainan_router,tags=["Permainan"])



