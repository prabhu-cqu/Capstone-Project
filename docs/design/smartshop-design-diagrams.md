# SmartShop AI — Week Five Design Diagrams

**Unit:** COIT13230 — Application Development Project  
**Project:** SmartShop AI  
**Team:** Daler Abdukarimov, Prabhu Ram Khadka and Jeet Patel  
**Current development increment:** Product Catalogue  
**Requirements covered first:** FR1, FR2 and FR3

These diagrams provide the design baseline required before implementation of the first vertical feature. The Level 1 use-case diagram covers the complete MVP at a high level. The remaining diagrams focus on the Product Catalogue increment assigned across the three team members.

## 1. Level 1 Use-Case Diagram

The oval nodes represent system use cases. The diagram keeps the MVP at Level 1 while linking each function to the approved requirements.

```mermaid
flowchart LR
    Visitor[Visitor]
    Customer[Customer]
    Admin[Administrator]
    AIService[External AI service]

    subgraph SmartShop[SmartShop AI system]
        direction TB
        Catalogue([Browse, search and view products — FR1–FR3])
        Account([Register, log in and log out — FR4])
        Cart([Manage shopping cart — FR5])
        Checkout([Complete simulated checkout — FR6])
        History([View personal order history — FR7])
        Assistance([Use AI shopping assistance — FR8–FR10])
        Administration([Manage catalogue, reviews, stock and orders — FR11–FR13])
    end

    Visitor --> Catalogue
    Visitor --> Account
    Customer --> Catalogue
    Customer --> Account
    Customer --> Cart
    Customer --> Checkout
    Customer --> History
    Customer --> Assistance
    Admin --> Administration
    AIService <--> Assistance
```

## 2. Product Catalogue Use-Case Detail

This diagram expands the catalogue use case that will be implemented first.

```mermaid
flowchart TB
    Shopper[Visitor or customer]
    Administrator[Administrator]

    subgraph CatalogueFeature[Product Catalogue feature]
        direction TB
        Browse([Browse products by category])
        Search([Search by keyword])
        Filter([Filter by category, brand and price])
        Sort([Sort by name or price])
        Details([View verified product details])
        Reviews([View approved reviews])
        Maintain([Create, edit or archive products])
    end

    Shopper --> Browse
    Shopper --> Search
    Shopper --> Filter
    Shopper --> Sort
    Shopper --> Details
    Shopper --> Reviews
    Administrator --> Maintain
    Browse -. includes .-> Details
    Details -. includes .-> Reviews
```

The first implementation covers browsing, searching, filtering, sorting and viewing details. Administrative maintenance is designed now but implemented after authentication and role checks are available.

## 3. Daler — Front-End UML Class Diagram

Daler is responsible for the React catalogue interface and client-side communication module.

```mermaid
classDiagram
    class ProductCataloguePage {
        -products: Product[]
        -filters: CatalogueFilters
        -loading: boolean
        -errorMessage: string
        +loadProducts()
        +applyFilters(filters)
        +openProduct(productId)
    }

    class ProductFilterPanel {
        -searchText: string
        -categoryId: number
        -brandId: number
        -minimumPrice: decimal
        -maximumPrice: decimal
        -sortOption: string
        +submitFilters()
        +clearFilters()
    }

    class ProductGrid {
        +displayProducts(products)
        +displayNoResults()
    }

    class ProductCard {
        +productId: number
        +name: string
        +price: decimal
        +imageUrl: string
        +stockStatus: string
        +viewDetails()
    }

    class ProductDetailsPage {
        -product: Product
        -loading: boolean
        +loadProduct(productId)
        +displaySpecifications()
        +displayApprovedReviews()
    }

    class ProductApiClient {
        +fetchProducts(filters)
        +fetchProduct(productId)
        +fetchCategories()
        +fetchBrands()
    }

    ProductCataloguePage *-- ProductFilterPanel
    ProductCataloguePage *-- ProductGrid
    ProductGrid *-- ProductCard
    ProductCataloguePage --> ProductApiClient
    ProductDetailsPage --> ProductApiClient
```

## 4. Prabhu — Back-End UML Class Diagram

Prabhu is responsible for the Express API, catalogue business logic, MySQL access and database structure.

```mermaid
classDiagram
    class ProductRouter {
        +registerRoutes()
    }

    class ProductController {
        +listProducts(request, response)
        +getProduct(request, response)
        +createProduct(request, response)
        +updateProduct(request, response)
        +archiveProduct(request, response)
    }

    class ProductService {
        +searchProducts(filters)
        +getProductById(productId)
        +validateProduct(productData)
        +createProduct(productData)
        +updateProduct(productId, productData)
        +archiveProduct(productId)
    }

    class ProductRepository {
        +findAll(filters)
        +findById(productId)
        +insert(productData)
        +update(productId, productData)
        +archive(productId)
    }

    class Product {
        +productId: number
        +name: string
        +description: string
        +price: decimal
        +stockQuantity: number
        +imageUrl: string
        +compatibility: string
        +isActive: boolean
        +isInStock()
    }

    class Category {
        +categoryId: number
        +name: string
    }

    class Brand {
        +brandId: number
        +name: string
    }

    class ProductSpecification {
        +specificationId: number
        +name: string
        +value: string
    }

    class Review {
        +reviewId: number
        +rating: number
        +comment: string
        +status: string
    }

    ProductRouter --> ProductController
    ProductController --> ProductService
    ProductService --> ProductRepository
    ProductRepository --> Product
    Category "1" --> "0..*" Product
    Brand "1" --> "0..*" Product
    Product "1" *-- "0..*" ProductSpecification
    Product "1" *-- "0..*" Review
```

## 5. Jeet — Catalogue Testing UML Class Diagram

Jeet is responsible for catalogue test design, repeatable test data, execution evidence and defect reporting.

```mermaid
classDiagram
    class ProductTestData {
        +validProducts()
        +outOfStockProduct()
        +inactiveProduct()
        +invalidProduct()
    }

    class ProductApiTestSuite {
        +testListProducts()
        +testKeywordSearch()
        +testCategoryFilter()
        +testBrandFilter()
        +testPriceFilter()
        +testSorting()
        +testProductNotFound()
        +testInvalidQuery()
    }

    class ProductCatalogueUITestSuite {
        +testProductCardsDisplayed()
        +testFiltersUpdateResults()
        +testNoResultsMessage()
        +testLoadingState()
        +testErrorState()
        +testOpenProductDetails()
        +testKeyboardNavigation()
    }

    class ProductIntegrationTestSuite {
        +testFrontendApiDatabaseFlow()
        +testDatabaseValuesDisplayed()
        +testInactiveProductHidden()
        +testStockStatusConsistent()
    }

    ProductApiTestSuite --> ProductTestData
    ProductCatalogueUITestSuite --> ProductTestData
    ProductIntegrationTestSuite --> ProductTestData
```

## 6. Product Catalogue ERD

The ERD keeps repeating specifications in a separate table and allows only approved reviews to be shown publicly. `customer_id` is optional until customer review submission is implemented.

```mermaid
erDiagram
    CATEGORY ||--o{ PRODUCT : contains
    BRAND ||--o{ PRODUCT : identifies
    PRODUCT ||--o{ PRODUCT_SPECIFICATION : has
    PRODUCT ||--o{ REVIEW : receives
    USER o|--o{ REVIEW : writes

    CATEGORY {
        int category_id PK
        varchar name UK
        boolean is_active
    }

    BRAND {
        int brand_id PK
        varchar name UK
        boolean is_active
    }

    PRODUCT {
        int product_id PK
        int category_id FK
        int brand_id FK
        varchar name
        text description
        decimal price
        int stock_quantity
        varchar image_url
        text compatibility
        boolean is_active
        datetime created_at
        datetime updated_at
    }

    PRODUCT_SPECIFICATION {
        int specification_id PK
        int product_id FK
        varchar specification_name
        varchar specification_value
    }

    USER {
        int user_id PK
        varchar full_name
        varchar email UK
        varchar password_hash
        varchar role
        boolean is_active
    }

    REVIEW {
        int review_id PK
        int product_id FK
        int customer_id FK
        int rating
        text comment
        varchar status
        datetime created_at
    }
```

## 7. Client–Server Communication Diagram

This diagram identifies the modules responsible for sending catalogue data from the client and receiving and processing it on the server.

```mermaid
flowchart TB
    User[Visitor or customer]

    subgraph Client[React client]
        Page[ProductCataloguePage]
        Filters[ProductFilterPanel]
        ApiClient[ProductApiClient]
    end

    subgraph Server[Node.js and Express server]
        Router[ProductRouter]
        Controller[ProductController]
        Service[ProductService]
        Repository[ProductRepository]
    end

    Database[(MySQL database)]

    User --> Page
    Filters --> Page
    Page --> ApiClient
    ApiClient -- HTTP GET with query parameters --> Router
    Router --> Controller
    Controller --> Service
    Service --> Repository
    Repository -- Parameterised SQL --> Database
    Database -- Product rows --> Repository
    Repository --> Service
    Service --> Controller
    Controller -- JSON response --> ApiClient
    ApiClient --> Page
```

## 8. Catalogue Request Sequence Diagram

The example shows the complete search and filter request from the browser to MySQL and back.

```mermaid
sequenceDiagram
    actor User
    participant UI as React catalogue UI
    participant Client as ProductApiClient
    participant API as Express product API
    participant Service as ProductService
    participant Repository as ProductRepository
    participant DB as MySQL

    User->>UI: Enter search and filter values
    UI->>Client: fetchProducts(filters)
    Client->>API: GET /api/products?search=&categoryId=&sort=
    API->>API: Validate query parameters
    API->>Service: searchProducts(filters)
    Service->>Repository: findAll(validatedFilters)
    Repository->>DB: Execute parameterised SELECT
    DB-->>Repository: Matching product rows
    Repository-->>Service: Product records
    Service-->>API: Catalogue results
    API-->>Client: 200 OK and JSON body
    Client-->>UI: Products or empty result
    UI-->>User: Display cards or no-results message
```

## Design Decisions

- MySQL is the authoritative source for product names, prices, specifications and stock.
- The React client never connects directly to MySQL.
- All filtering inputs are validated on the Express server.
- SQL statements use parameters rather than concatenated user input.
- Archived products remain in the database but are excluded from public catalogue responses.
- Only approved reviews are returned to public product pages.
- The catalogue feature does not depend on the external AI service.
- AI functionality will retrieve catalogue data through controlled server-side modules in a later increment.

## Traceability

| Requirement | Diagram evidence |
|---|---|
| FR1 — Display catalogue by category | Use-case diagrams, front-end classes, back-end classes, ERD and sequence diagram |
| FR2 — Search, filter and sort | Detailed use cases, filter class, API classes and request sequence |
| FR3 — Display verified product details | Use cases, product classes, specifications/review relationships and ERD |
| FR11 — Catalogue administration | Administrator use case and controller/service/repository operations |
| NFR3 — Security | Server validation, role-controlled future administration and parameterised SQL |
| NFR7 — Maintainability | Separate UI, API, service, repository and data modules |
