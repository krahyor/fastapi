from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create an instance of CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Create a variable to store user data
users = []

# Create a UserModel class to receive data from users
class UserModel(BaseModel):
    username: str
    password: str

# Create a function to check password validity
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Create a function to hash passwords
def get_password_hash(password):
    return pwd_context.hash(password)

# Create a route for user registration
@app.post("/register")
def register(user: UserModel):
    # Check if the user already exists
    if any(u["username"] == user.username for u in users):
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # Hash the password and store the user data
    hashed_password = get_password_hash(user.password)
    users.append({"username": user.username, "password": hashed_password})
    
    return {"message": "User registered successfully"}
    

# Create a route for user login
@app.post("/login")
def login(user: UserModel):
    # Check if the username and password are correct
    matched_user = next((u for u in users if u["username"] == user.username), None)
    if not matched_user or not verify_password(user.password, matched_user["password"]):
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    
    return {"message": "Login successful"}

@app.get("/users/count")
def count_users():
    return {"message": f"There are {len(users)} registered users."}

@app.get("/users")
def get_users():
    return {"users": [u["username"] for u in users]}