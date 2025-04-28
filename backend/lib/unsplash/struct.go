package unsplash

type RandomPhotosResponse struct {
    Id                     string                 `json:"id"`
    Slug                   string                 `json:"slug"`
    AlternativeSlugs       AlternativeSlugs       `json:"alternative_slugs"`
    CreatedAt              string                 `json:"created_at"`
    UpdatedAt              string                 `json:"updated_at"`
    PromotedAt             *interface{}           `json:"promoted_at"`
    Width                  int                    `json:"width"`
    Height                 int                    `json:"height"`
    Color                  string                 `json:"color"`
    BlurHash               string                 `json:"blur_hash"`
    Description            *interface{}           `json:"description"`
    AltDescription         string                 `json:"alt_description"`
    Breadcrumbs            []interface{}          `json:"breadcrumbs"`
    Urls                   Urls                   `json:"urls"`
    Links                  Links                  `json:"links"`
    Likes                  int                    `json:"likes"`
    LikedByUser            bool                   `json:"liked_by_user"`
    CurrentUserCollections []interface{}          `json:"current_user_collections"`
    Sponsorship            *interface{}           `json:"sponsorship"`
    TopicSubmissions       TopicSubmissions       `json:"topic_submissions"`
    AssetType              string                 `json:"asset_type"`
    User                   User                   `json:"user"`
    Exif                   Exif                   `json:"exif"`
    Location               Location               `json:"location"`
    Views                  int                    `json:"views"`
    Downloads              int                    `json:"downloads"`
}

type AlternativeSlugs struct {
    En string `json:"en"`
    Es string `json:"es"`
    Ja string `json:"ja"`
    Fr string `json:"fr"`
    It string `json:"it"`
    Ko string `json:"ko"`
    De string `json:"de"`
    Pt string `json:"pt"`
}

type Urls struct {
    Raw     string `json:"raw"`
    Full    string `json:"full"`
    Regular string `json:"regular"`
    Small   string `json:"small"`
    Thumb   string `json:"thumb"`
    SmallS3 string `json:"small_s3"`
}

type TopicSubmissions struct {
    ArchitectureInterior ArchitectureInterior `json:"architecture_interior"`
}

type ArchitectureInterior struct {
    Status     string `json:"status"`
    ApprovedOn string `json:"approved_on"`
}

type User struct {
    Id                         string       `json:"id"`
    UpdatedAt                  string       `json:"updated_at"`
    Username                   string       `json:"username"`
    Name                       string       `json:"name"`
    FirstName                  string       `json:"first_name"`
    LastName                   string       `json:"last_name"`
    TwitterUsername            string       `json:"twitter_username"`
    PortfolioUrl               string       `json:"portfolio_url"`
    Bio                        string       `json:"bio"`
    Location                   string       `json:"location"`
    Links                      Links        `json:"links"`
    ProfileImage               ProfileImage `json:"profile_image"`
    InstagramUsername          string       `json:"instagram_username"`
    TotalCollections           int          `json:"total_collections"`
    TotalLikes                 int          `json:"total_likes"`
    TotalPhotos                int          `json:"total_photos"`
    TotalPromotedPhotos        int          `json:"total_promoted_photos"`
    TotalIllustrations         int          `json:"total_illustrations"`
    TotalPromotedIllustrations int          `json:"total_promoted_illustrations"`
    AcceptedTos                bool         `json:"accepted_tos"`
    ForHire                    bool         `json:"for_hire"`
    Social                     Social       `json:"social"`
}

type Links struct {
    Self      string `json:"self,omitempty"`
    Html      string `json:"html,omitempty"`
    Photos    string `json:"photos,omitempty"`
    Likes     string `json:"likes,omitempty"`
    Portfolio string `json:"portfolio,omitempty"`
    Download         string `json:"download,omitempty"`
    DownloadLocation string `json:"download_location,omitempty"`
}

type ProfileImage struct {
    Small  string `json:"small"`
    Medium string `json:"medium"`
    Large  string `json:"large"`
}

type Social struct {
    InstagramUsername string       `json:"instagram_username"`
    PortfolioUrl      string       `json:"portfolio_url"`
    TwitterUsername   string       `json:"twitter_username"`
    PaypalEmail       *interface{} `json:"paypal_email"`
}

type Exif struct {
    Make         string `json:"make"`
    Model        string `json:"model"`
    Name         string `json:"name"`
    ExposureTime string `json:"exposure_time"`
    Aperture     string `json:"aperture"`
    FocalLength  string `json:"focal_length"`
    Iso          int    `json:"iso"`
}

type Location struct {
    Name     string       `json:"name"`
    City     *interface{} `json:"city"`
    Country  string       `json:"country"`
    Position Position     `json:"position"`
}

type Position struct {
    Latitude  float64 `json:"latitude"`
    Longitude float64 `json:"longitude"`
}
