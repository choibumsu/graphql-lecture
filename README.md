# GraphQL 실습

## Project Start

```bash
git clone https://github.com/choibumsu/graphql-lecture.git

cd graphql-lecture

npm install

npm start
```

## GraphQL Playground

**http://127.0.0.1:4000/** or **http://localhost:4000/**

### Query Examples

```graphql
# load all programmers
query allProgrammers {
  programmers {
    id
    name
    gender
    address {
      location
      detail
    }
    grades
  }
}

# load programmer by Id
query oneProgrammer {
  programmer(id: 1) {
    name
    category {
      ... on Backend {
        database
      }
      ... on Frontend {
        native
      }
    }
    friends {
      friend_a {
        name
      }
      friend_b {
        name
      }
      metYear
    }
  }
}
```

---

### Mutation Examples

```graphql
mutation addProgrammer($input: ProgrammerInput!) {
  addProgrammer(input: $input) {
    name
    category {
      ... on Backend {
        frameworks
        database
      }
      ... on Frontend {
        frameworks
        native
      }
    }
  }
}
```

Add Query Variables By Playground (left-bottom)

```json
{
  "input": {
    "name": "홍길동",
    "gender": "MALE",
    "grades": [1.0],
    "addressLocation": "주소",
    "category": "Frontend",
    "frameworks": ["Vue.js"],
    "native": false,
    "friends": [1]
  }
}
```

```json
{
  "input": {
    "name": "김삼순",
    "gender": "FEMALE",
    "grades": [1.0],
    "addressLocation": "주소",
    "addressDetail": "상세주소",
    "category": "Backend",
    "frameworks": ["Django", "Spring"],
    "database": ["MySql"],
    "friends": [1, 2]
  }
}
```
