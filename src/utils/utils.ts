import { Injectable } from "@nestjs/common";

@Injectable()
export class Utils {
    private EMAIL_PATTERN: RegExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    isEmail(email: string): boolean {
        return this.EMAIL_PATTERN.test(email);
    }

    isMongoId(id: string): RegExpMatchArray {
        return id.match(/^[0-9a-fA-F]{24}$/);
    }

    static overload() { // !: Polymorph
        var len2func = [];
        for(const element of arguments)
          if(typeof(element) == "function")
            len2func[element.length] = element;
        return function() {
          return len2func[arguments.length].apply(this, arguments);
        }
      }
}