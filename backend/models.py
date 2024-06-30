"""This module contains the model for the transaction table."""

from database import Base
from sqlalchemy import Column, Integer, String, Float, Boolean


class Transaction(Base):
    """This class represents the transaction table in the database."""

    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float)
    category = Column(String)
    description = Column(String)
    is_income = Column(Boolean)
    date = Column(String)
