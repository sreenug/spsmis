from django.contrib import admin
from django import forms

import spsmis.settings
from mis.models import Country, State, District, Block, Sublocation, Village, Person, Cluster, SHGBaseLine, SHGProgram, LoanType, LoanSubType
from mis.models import Loan, ExpectedReceipt, ActualReceipt


admin.site.register(Country)
admin.site.register(State)
admin.site.register(District)
admin.site.register(Block)
admin.site.register(Sublocation)
admin.site.register(Village)
admin.site.register(Person)
admin.site.register(Cluster)
admin.site.register(SHGBaseLine)
admin.site.register(SHGProgram)
admin.site.register(LoanType)
admin.site.register(LoanSubType)
admin.site.register(Loan)
admin.site.register(ExpectedReceipt)
admin.site.register(ActualReceipt)