from django.db import models


class Country(models.Model):
    country_name = models.CharField(max_length=100, unique='True')

    def __unicode__(self):
        return self.country_name


class State(models.Model):
    state_name = models.CharField(max_length=100, unique='True')
    country = models.ForeignKey(Country)

    def __unicode__(self):
        return self.state_name


class District(models.Model):
    district_name = models.CharField(max_length=100, unique='True')
    state = models.ForeignKey(State)

    def __unicode__(self):
        return self.district_name


class Block(models.Model):
    block_name = models.CharField(max_length=100, unique='True')
    district = models.ForeignKey(District)

    def __unicode__(self):
        return self.block_name


class Sublocation(models.Model):
    sublocation_name = models.CharField(max_length=100)
    block = models.ForeignKey(Block)

    class Meta:
        unique_together = ("sublocation_name", "block")


class Village(models.Model):
    village_name = models.CharField(max_length=100)
    sublocation = models.ForeignKey(Sublocation)

    class Meta:
        unique_together = ("village_name", "sublocation")

    def __unicode__(self):
        return self.village_name


class Person(models.Model):
    person_name = models.CharField(max_length=100)
    spouse_name = models.CharField(max_length=100)
    job_card_number = models.CharField(max_length=100, blank=True)
    voter_card_number = models.CharField(max_length=100)
    village = models.ForeignKey(Village)
    no_of_adults = models.IntegerField()
    no_of_children = models.IntegerField()
    house_hold_per_capita_income = models.IntegerField()
    date_of_entry = models.DateField()
    phone_no = models.CharField(max_length=100, blank=True)

    class Meta:
        unique_together = ("person_name", "spouse_name", "village")

    def __unicode__(self):
        return self.person_name+"("+self.spouse_name+", "+self.village+")"


### For SHG Level Data Capture
class Cluster(models.Model):
    cluster_name = models.CharField(max_length=100)
    village = models.ForeignKey(Village)

    class Meta:
        unique_together = ("cluster_name", "village")

    def __unicode__(self):
        return self.cluster_name


class SHGBaseLine(models.Model):
    group_name = models.CharField(max_length=100)
    cluster = models.ForeignKey(Cluster)
    date_of_formation = models.DateField()
    LINKAGE_CHOICES = (('Yes', 'yes'), ('No', 'no'))
    bank_linkage = models.CharField(max_length=5, choices=LINKAGE_CHOICES)
    cc_limit = models.CharField(max_length=100)
    drawing_power = models.CharField(max_length=100)
    savings_account_number = models.CharField(max_length=100)
    loan_account_number = models.CharField(max_length=100)
    savings_account_balance = models.CharField(max_length=100)
    loan_account_balance = models.CharField(max_length=100)

    class Meta:
        unique_together = ("group_name", "cluster")

    def __unicode__(self):
        return self.group_name + "( " + self.cluster_name + ")"


class SHGProgram(models.Model):
    person = models.ForeignKey(Person)
    loan_from_money_lenders = models.IntegerField()
    loan_from_kcc_or_mfis = models.IntegerField()

### Loan Data


class LoanType(models.Model):
    type_name = models.CharField(max_length=100)

    def __unicode__(self):
        return self.type_name


class LoanSubType(models.Model):
    subtype_name = models.CharField(max_length=100)
    type = models.ForeignKey(LoanType)

    def __unicode__(self):
        return self.subtype_name


class Loan(models.Model):
    type = models.ForeignKey(LoanType)
    subtype = models.ForeignKey(LoanSubType)
    amount = models.FloatField()


class ExpectedReceipt(models.Model):
    expected_savings = models.FloatField()
    expected_general_principle = models.FloatField()
    expected_general_interest = models.FloatField()
    expected_special_principle = models.FloatField()
    expected_special_loan = models.FloatField()


class ActualReceipt(models.Model):
    fixed_deposit_saving = models.FloatField()
    regular_saving = models.FloatField()
    insurance_premium_paid = models.FloatField()
    fees = models.FloatField()
    general_principle = models.FloatField()
    general_interest = models.FloatField()
    special_principle = models.FloatField()
    special_interest = models.FloatField()
