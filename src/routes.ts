import { UserController } from "./controller/UserController";
import { AddressController } from "./controller/AddressController";
import { CountryController } from "./controller/CountryController";
import { CityController } from "./controller/CityController";
import { DistrictController } from "./controller/DistrictController";
import { TownController } from "./controller/TownController";
import { FileController } from "./controller/FileController";
import { SearchController } from "./controller/SearchController";

export const Routes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/users/search",
    controller: UserController,
    action: "search",
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
  },
  {
    method: "put",
    route: "/users/:id",
    controller: UserController,
    action: "update",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
  },
  {
    method: "get",
    route: "/address",
    controller: AddressController,
    action: "all",
  },
  {
    method: "post",
    route: "/address",
    controller: AddressController,
    action: "save",
  },
  {
    method: "put",
    route: "/address/:id",
    controller: AddressController,
    action: "update",
  },
  {
    method: "get",
    route: "/address/:id",
    controller: AddressController,
    action: "one",
  },
  {
    method: "get",
    route: "/address/user/:userId",
    controller: AddressController,
    action: "userOne",
  },
  {
    method: "get",
    route: "/country",
    controller: CountryController,
    action: "all",
  },
  {
    method: "post",
    route: "/country",
    controller: CountryController,
    action: "save",
  },
  {
    method: "put",
    route: "/country/:id",
    controller: CountryController,
    action: "update",
  },
  {
    method: "get",
    route:"/country/users/:countryId",
    controller: CountryController,
    action: "countryUsers",
  },
  {
    method: "get",
    route: "/cities",
    controller: CityController,
    action: "all",
  },
  {
    method: "post",
    route: "/cities",
    controller: CityController,
    action: "save",
  },
  {
    method: "put",
    route: "/cities/:id",
    controller: CityController,
    action: "update",
  },
  {
    method: "get",
    route: "/cities/users/:cityId",
    controller: CityController,
    action: "cityUsers",
  },
  {
    method: "get",
    route: "/district",
    controller: DistrictController,
    action: "all",
  },
  {
    method: "post",
    route: "/district",
    controller: DistrictController,
    action: "save",
  },
  {
    method: "put",
    route: "/district/:id",
    controller: DistrictController,
    action: "update",
  },
  {
    method: "get",
    route: "/district/users/:districtId",
    controller: DistrictController,
    action: "districtUsers",
  },
  {
    method: "get",
    route: "/town",
    controller: TownController,
    action: "all",
  },
  {
    method: "post",
    route: "/town",
    controller: TownController,
    action: "save",
  },
  {
    method: "put",
    route: "/town/:id",
    controller: TownController,
    action: "update",
  },
  {
    method: "get",
    route: "/town/users/:townId",
    controller: TownController,
    action: "townUsers",
  },
  {
    method:"get",
    route: "/file-read",
    controller: FileController,
    action:"all"
  },
  {
    method:"get",
    route: "/search",
    controller: SearchController,
    action: "all"
  }
];
