""" This is the main file of the FastAPI application. It contains the FastAPI instance and the CORS middleware. """

from typing import Annotated, List
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import models
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine

app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TransactionBase(BaseModel):
    """This class represents the transaction model."""

    amount: float
    category: str
    description: str
    is_income: bool
    date: str


class TransactionModel(TransactionBase):
    """This class represents the transaction model."""

    id: int

    class Config:
        """This class is used to configure the Pydantic model."""

        orm_mode = True


class TransactionDeleteRequest(BaseModel):
    transaction_ids: List[int]


def get_db():
    """This function returns a database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
models.Base.metadata.create_all(bind=engine)


@app.post("/transactions/", response_model=TransactionModel)
async def create_transaction(
    transaction: TransactionBase, db: Session = Depends(get_db)
):
    """This function creates a transaction."""
    db_transaction = models.Transaction(**transaction.model_dump())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction


@app.get("/transactions/", response_model=List[TransactionModel])
async def read_transactions(db: db_dependency, skip: int = 0, limit: int = 100):
    """This function returns all transactions."""
    transactions = db.query(models.Transaction).offset(skip).limit(limit).all()
    return transactions


@app.delete("/transactions/")
async def delete_transactions(
    delete_request: TransactionDeleteRequest, db: Session = Depends(get_db)
):
    """This function deletes multiple transactions based on a list of transaction IDs."""

    db.query(models.Transaction).filter(
        models.Transaction.id.in_(delete_request.transaction_ids)
    ).delete(synchronize_session=False)
    db.commit()
    return {
        "message": f"Transactions with IDs {delete_request.transaction_ids} deleted successfully."
    }
